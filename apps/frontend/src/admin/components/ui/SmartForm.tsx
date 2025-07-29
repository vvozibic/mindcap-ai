import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, Resolver, useForm } from "react-hook-form";
import {
  z,
  ZodBoolean,
  ZodDate,
  ZodNumber,
  ZodObject,
  ZodRawShape,
  ZodTypeAny,
  ZodUnion,
} from "zod";

type FieldMeta<T> = {
  [K in keyof T]?: {
    label?: string;
    placeholder?: string;
    type?: string;
  };
};

interface SmartFormProps<TSchema extends ZodUnion> {
  schema: TSchema;
  // ⬇️ приводим к конкретному типу input
  defaultValues?: Partial<z.infer<TSchema>>;
  visibleFields?: (keyof z.infer<TSchema>)[];
  fieldMeta?: FieldMeta<z.infer<TSchema>>;
  onSubmit: (values: z.infer<TSchema>) => void;
}

export function SmartForm<TSchema extends ZodObject<ZodRawShape>>({
  schema,
  defaultValues,
  visibleFields,
  fieldMeta,
  onSubmit,
}: SmartFormProps<TSchema>) {
  // ⬇️ используем output как FieldValues, потому что resolver возвращает output<T>
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema) as any as Resolver<any>,
    defaultValues: defaultValues as any, // 👈 чтобы избежать конфликта типов
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const fields = Object.entries(schema) as [
    keyof z.infer<TSchema>,
    ZodTypeAny,
  ][];

  const visible = visibleFields
    ? fields.filter(([key]) => visibleFields.includes(key))
    : fields;

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4">
      {visible.map(([name, field]) => {
        const meta = fieldMeta?.[name] || {};
        const inputType = meta.type || inferInputType(field);

        return (
          <div key={String(name)} className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              {meta.label || String(name)}
            </label>
            <input
              {...register(name as any)}
              type={inputType}
              placeholder={meta.placeholder}
              className="border rounded px-3 py-2"
            />
            {(errors as FieldErrors<any>)[name] && (
              <p className="text-xs text-red-500">
                {String((errors as FieldErrors<any>)[name]?.message)}
              </p>
            )}
          </div>
        );
      })}
      <button type="submit" className="btn btn-primary">
        Сохранить
      </button>
    </form>
  );
}

function inferInputType(schema: ZodTypeAny): string {
  if (schema instanceof ZodNumber) return "number";
  if (schema instanceof ZodBoolean) return "checkbox";
  if (schema instanceof ZodDate) return "date";
  return "text";
}
