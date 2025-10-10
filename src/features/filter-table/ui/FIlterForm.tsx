// import { FilterSchema } from "../model/types";
//
// interface FilterFormProps {
//   schema: object[];
//   onSubmit: (values: Record<string, any>) => void;
// }
//
// export const FilterForm = ({ schema, onSubmit }: FilterFormProps) => {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData(e.target as HTMLFormElement);
//     onSubmit(Object.fromEntries(formData.entries()));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-4">
//       {schema.map((field) => {
//         if (field.type === "text") {
//           return (
//             <div key={field.name}>
//               <label>{field.label}</label>
//               <input
//                 type="text"
//                 name={field.name}
//                 placeholder={field.placeholder}
//               />
//             </div>
//           );
//         }
//         if (field.type === "select") {
//           return (
//             <div key={field.name}>
//               <label>{field.label}</label>
//               <select name={field.name}>
//                 {field.options.map((opt) => (
//                   <option key={opt.value} value={opt.value}>
//                     {opt.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           );
//         }
//         if (field.type === "date") {
//           return (
//             <div key={field.name}>
//               <label>{field.label}</label>
//               <input type="date" name={field.name} />
//             </div>
//           );
//         }
//         return null;
//       })}
//       <button type="submit">Apply</button>
//     </form>
//   );
// };
