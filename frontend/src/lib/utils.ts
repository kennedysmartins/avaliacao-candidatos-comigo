export function formatDate(dataString: string | number | Date | null) {
  if (!dataString) return 
  const data = new Date(dataString)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }
  const formatadorDeData = new Intl.DateTimeFormat("pt-BR", options)
  return formatadorDeData.format(data)
}

export const formatDateToInput = (date: Date | null) => {
  if (!date) return
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function calculateBusinessDaysFromNow(date: Date | string): number {
  const now = new Date();
  let count = 0;
  const targetDate = new Date(date);

  targetDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  if (targetDate <= now) {
    return 0;
  }

  while (now < targetDate) {
    const dayOfWeek = now.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { 
      count++;
    }
    now.setDate(now.getDate() + 1);
  }

  return count;
}

export function addBusinessDays(startDate: Date, days: number): Date {
  const result = new Date(startDate);
  let daysAdded = 0;

  while (result.getDay() === 0 || result.getDay() === 6) { 
    result.setDate(result.getDate() + 1); 
  }

  while (daysAdded <= days) {
    result.setDate(result.getDate() + 1);
    const dayOfWeek = result.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysAdded++;
    }
  }

  return result;
}