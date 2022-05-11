export default function EditPage({ page }) {
  const PageName = page.charAt(0).toUpperCase() + page.slice(1);
  return <h1>Edit {PageName} Page</h1>;
}
