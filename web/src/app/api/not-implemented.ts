export function notImplemented() {
  return Response.json(
    { error: { code: "NOT_IMPLEMENTED", message: "Tính năng đang được phát triển." } },
    { status: 501 },
  );
}
