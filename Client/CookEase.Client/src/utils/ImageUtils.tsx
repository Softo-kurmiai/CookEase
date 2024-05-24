// Utility function for converting Base64 image string to an actual image for displaying
export function base64ToImage(base64String: string, altText: string = "Image"): JSX.Element {
  return <img src={base64String} alt={altText} style={{ maxWidth: "100%" }} />;
}