export default {

    // Show success
    showSuccess(title, message) {
        Swal.fire(
            title,
            message,
            'success'
        )
    },

    // Show error
    showError(title, message) {
        Swal.fire({
            type: '',
            title: title,
            text: message,
        })
    }
}