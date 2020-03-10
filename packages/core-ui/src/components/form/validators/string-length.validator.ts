export function StringValidator(
  minLength: number,
  maxLength?: number
): Function {
  return (value: string): { key: string; msg: string } | null => {
    const hasError = (!!value && value.length < minLength) || !value;
    return hasError
      ? {
          key: 'minLength',
          msg: `At least ${minLength} characters`
        }
      : null;
  };
}
