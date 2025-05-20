export default defineEventHandler((event) => {
  const id = event.context.params?.id;
  return `GET /api/reviews/${id}`;
});
