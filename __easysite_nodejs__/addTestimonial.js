async function addTestimonial(testimonialData) {
    // This function adds a testimonial to the database
    try {
        const result = await window.ezsite.apis.tableCreate(33676, testimonialData);
        return {
            success: true,
            message: "Testimonial added successfully",
            data: result
        };
    } catch (error) {
        throw new Error(`Failed to add testimonial: ${error.message}`);
    }
}