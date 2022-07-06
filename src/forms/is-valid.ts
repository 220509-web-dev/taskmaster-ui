export const isFormValid = (formData: any) => {
    for (let field in formData) {
        if (!formData[field]) {
            return false;
        }
    }
    return true;
}