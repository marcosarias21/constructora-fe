import { z } from 'zod'

export const taskSchema = z.object({
  station: z.string().optional(),
  incidence: z.string().optional(),
  description: z.string().min(1, 'La descripción es obligatoria'),
  location: z.string().min(1, 'La dirección es obligatoria'),
  estimatedTime: z.string().min(1, 'Tiempo estimado requerido'),
})
