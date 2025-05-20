export default defineEventHandler((event) => {
  const id = event.context.params?.id;
  return `DELETE /api/reviews/${id}`;
});
