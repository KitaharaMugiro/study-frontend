export default {
    isSSR: () => {
        if (window) {
            return false
        }
        return true
    }
}