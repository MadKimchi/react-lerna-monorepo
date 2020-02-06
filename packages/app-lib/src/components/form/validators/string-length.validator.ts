export function StringValidator(
  minLength: number,
  maxLength?: number
): Function {
  return (value: string): boolean => {
    return (!!value && value.length < minLength) || !value;
  };
}
