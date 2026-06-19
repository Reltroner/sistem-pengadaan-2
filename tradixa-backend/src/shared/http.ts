export function successResponse(data: any) {
  return {
    ok: true,
    data,
  };
}

export function errorResponse(code: string, message: string) {
  return {
    ok: false,
    error: {
      code,
      message,
    },
  };
}
