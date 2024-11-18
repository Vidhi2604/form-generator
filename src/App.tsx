import React, { useEffect, useRef, useState } from "react";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";

interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern: string; message: string };
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

const defaultSchema: FormSchema = {
  formTitle: "Survey",
  formDescription: "Please fill out below details",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name",
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "Email",
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email address",
      },
    },
    {
      id: "companySize",
      type: "radio",
      label: "Company Size",
      required: true,
      options: [
        { value: "1-50", label: "1-50 employees" },
        { value: "51-200", label: "51-200 employees" },
        { value: "201-1000", label: "201-1000 employees" },
        { value: "1000+", label: "1000+ employees" }
      ]
    },
    {
      id: "industry",
      type: "radio",
      label: "Industry",
      required: true,
      options: [
        { value: "tech", label: "Technology" },
        { value: "healthcare", label: "Healthcare" },
        { value: "finance", label: "Finance" },
        { value: "retail", label: "Retail" },
        { value: "other", label: "Other" }
      ]
    },
    {
      id: "timeline",
      type: "radio",
      label: "Project Timeline",
      required: true,
      options: [
        { value: "immediate", label: "Immediate (within 1 month)" },
        { value: "short", label: "Short-term (1-3 months)" },
        { value: "medium", label: "Medium-term (3-6 months)" },
        { value: "long", label: "Long-term (6+ months)" }
      ]
    },
    {
      id: "comments",
      type: "textarea",
      label: "Additional Comments",
      required: false,
      placeholder: "Any other details you'd like to share..."
    },
  ],
};

const App: React.FC = () => {
  const [schema, setSchema] = useState<FormSchema>(defaultSchema);
  const [zodSchema, setZodSchema] = useState<ZodSchema>(z.object({}));
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [submittedData, setSubmittedData] = useState<any[]>([]);
  const jsonEditorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<JSONEditor | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(zodSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    const generatedSchema = z.object(
      Object.fromEntries(
        schema.fields.map((field) => [
          field.id,
          field.required
            ? z.string().min(1, `${field.label} is required`)
            : z.string().optional(),
        ])
      )
    );
    setZodSchema(generatedSchema);
    reset();
  }, [schema, reset]);

  useEffect(() => {
    if (jsonEditorRef.current) {
      editorInstance.current = new JSONEditor(jsonEditorRef.current, {
        mode: "code",
        onChange: () => {
          try {
            const updatedSchema = editorInstance.current!.get() as FormSchema;
            setSchema(updatedSchema);
          } catch {
            console.error("Invalid JSON");
          }
        },
      });
      editorInstance.current.set(schema);
    }

    return () => {
      editorInstance.current?.destroy();
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const copyFormJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    alert("Form JSON copied to clipboard!");
  };

  const downloadSubmissions = () => {
    const blob = new Blob([JSON.stringify(submittedData, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "form-submissions.json";
    link.click();
  };

  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    setSubmittedData((prev) => [...prev, data]);
    alert("Form submitted successfully!");
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="p-4 flex justify-between items-center">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>

        {/* Copy JSON Button */}
        <button
          onClick={copyFormJSON}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Copy Form JSON
        </button>

        {/* Download Submissions Button */}
        <button
          onClick={downloadSubmissions}
          disabled={submittedData.length === 0} // Disable if no submissions
          className={`${
            submittedData.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600 dark:bg-gray-700 dark:hover:bg-gray-600"
          } text-white px-4 py-2 rounded`}
        >
          Download Submissions
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* JSON Editor Section */}
        <div className="p-4 bg-white rounded shadow dark:bg-gray-800 dark:text-gray-300">
          <h2 className="text-xl font-bold mb-4">JSON Editor</h2>
          <div ref={jsonEditorRef} className="h-96 jsoneditor"></div>
        </div>

        {/* Form Section */}
        <div className="p-4 bg-white rounded shadow dark:bg-gray-800 dark:text-gray-300">
          <h2 className="text-xl font-bold mb-4">{schema.formTitle}</h2>
          <p className="mb-4">{schema.formDescription}</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {schema.fields.map((field) => (
              <div key={field.id} className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>
                {field.type === "radio" ? (
                  field.options?.map((option) => (
                    <div key={option.value} className="mb-2">
                      <label className="inline-flex items-center">
                        <input
                          {...register(field.id)}
                          type="radio"
                          value={option.value}
                          className="mr-2"
                        />
                        {option.label}
                      </label>
                    </div>
                  ))
                ) : (
                  <input
                    {...register(field.id)}
                    type={field.type}
                    placeholder={field.placeholder}
                    className={`w-full p-2 border ${
                      errors[field.id] ? "border-red-500" : "border-gray-300"
                    } rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  />
                )}
                {errors[field.id] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.id]?.message as string}
                  </p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
