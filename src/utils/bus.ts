import mitt from 'mitt'

window.bus = window.bus || mitt()
export default window.bus
