import * as yup from 'yup';
export const permissionValidationSchema = yup.object({
  role_id_permission_id: yup.string().required().uuid(),
  name: yup.string().max(255).required(),
  description: yup.string().max(255).nullable().required(),
});
