const loadImages = async (files: string[]): Promise<boolean> => {
  const imagePromises = files.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve();
      img.onerror = () => reject();
    });
  });

  try {
    await Promise.all(imagePromises);
    return true;
  } catch (error) {
    return false;
  }
};

export default loadImages;
