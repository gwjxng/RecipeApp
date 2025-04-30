import { ref } from 'vue'

export function useFormLogic() {
    const selectedDifficulty = ref('')
    const imageUrl = ref(null)
    const fileInput = ref(null)

    function handleImageUpload(event) {
        const file = event.target.files[0]
        if (file) {
          imageUrl.value = URL.createObjectURL(file)

        }
    }

    function deleteImage() {
        imageUrl.value = null  // Remove the uploaded image

        // Reset the file input so that the same file can be uploaded again
        if (fileInput.value) {
            fileInput.value.value = ''  // This clears the file input value
        }
    }


    return {
        selectedDifficulty,
        imageUrl,
        fileInput,
        handleImageUpload,
        deleteImage
    }
}
