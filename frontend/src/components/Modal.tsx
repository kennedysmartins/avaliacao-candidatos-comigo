import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsXLg } from 'react-icons/bs';

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              zIndex: 999,
            }}
            onClick={onClose}
          />
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: '15px',
              left: 'calc(70% - 50px)',
              zIndex: 1001,
              padding: '5px 10px',
              border: 'none',
              color: 'gray',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            <BsXLg size={20} />
          </motion.button>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '30%',
              height: '100%',
              backgroundColor: 'white',
              boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
            }}
          >
            <div style={{ padding: '20px' }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal