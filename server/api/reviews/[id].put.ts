export default defineEventHandler((event) => {
  const id = event.context.params?.id;
  return `PUT /api/reviews/${id}`;
});
