import React, { useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Post from "@/Pages/Posts/Post";
import { useForm, Head } from "@inertiajs/react";
import PostForm from "./PostForm";

export default function Index({ auth, posts }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        titulo: "",
        conteudo: "",
        imagem_destaque: null, // Inicialize como null
    });

    const inputRef = useRef(); // Crie uma referência para o input de arquivo

    const submit = (e) => {
        e.preventDefault();


        post(route("posts.store"), {
            onSuccess: () => {
                reset();
                inputRef.current.value = ""; // Redefina o valor do input de arquivo
            },
        });
    };

    const editing =() =>{
        console.log("Editar")
    }

    const cancel = () => {
        if (window.confirm("Tem certeza de que deseja cancelar?")) {
            reset();
            clearErrors();
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Post" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <PostForm
                    data={data}
                    errors={errors}
                    setData={setData}
                    inputRef={inputRef}
                    submit={submit}
                    cancel={cancel}
                    processing={processing}
                />

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}

                    {/* Edit Button */}
                    {auth.user.id === post.user.id && (
                                <button
                                    onClick={() => {editing}}
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                                >
                                    Edit
                                </button>
                            )}

                            {/* Remove Button */}
                            {auth.user.id === post.user.id && (
                                <button
                                    onClick={() => remover }
                                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                                >
                                    Remove
                                </button>
                            )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}