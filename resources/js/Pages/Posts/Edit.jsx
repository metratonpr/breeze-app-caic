import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm} from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import PostForm from "./PostForm";

export default function Edit({ auth, post }) {
    const inputRef = React.useRef();

    const { data, setData, put, clearErrors, reset, errors } = useForm(
        "editForm",
        {
            titulo: post.titulo || "",
            conteudo: post.conteudo || "",
            imagem_destaque: post.imagem_destaque || "",
        }
    );

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        // put(route("posts.update", post.id));
        router.post(route("posts.update", post.id), {
            ...data,
            _method: "put",
            forceFormData: true,
        });
    };

    const cancel = () => {
        if (window.confirm("Tem certeza de que deseja cancelar?")) {
            reset();
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Editar Post - ${post.titulo}`} />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <PostForm
                    data={data}
                    errors={errors}
                    setData={setData}
                    inputRef={inputRef}
                    submit={submit}
                    cancel={cancel}
                />
            </div>
        </AuthenticatedLayout>
    );
}