export const withTimestamps = <T extends object>(
  data: T
): T & { createdAt: Date; updatedAt: Date } => ({
  ...data,
  createdAt: new Date(),
  updatedAt: new Date(),
});
