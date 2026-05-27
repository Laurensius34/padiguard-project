const OnlineAIService = {
  async uploadAndDetect(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch("/api/detect", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(
        errData.message || "Gagal terhubung ke upstream API Server.",
      );
    }

    const jsonResult = await response.json();
    return jsonResult.data;
  },
};
