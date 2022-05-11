export const listVariants = {
  hidden: {
    opacity: 0,
    y: 500
  },
  visible: (i) => ({
    opacity: 1,
    transition: {
      duration: .3,
      delay: i * 0.1
    },
    y: 0
  }),
}