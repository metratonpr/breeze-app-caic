import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm, Head } from '@inertiajs/react';
export default function Index({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        titulo: '',
        conteudo: '',
        imagem_destaque: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('chirps.store'), { onSuccess: () => reset() });
    };
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Post" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="titulo" value="Titulo" />
                    <TextInput
                        id="titulo"
                        name="titulo"
                        value={data.titulo}
                        className="mt-1 block w-full"
                        autoComplete="titulo"
                        isFocused={true}
                        onChange={(e) => setData('titulo', e.target.value)}
                        required
                    />
                    <InputError message={errors.titulo} className="mt-2" />
                </div>  
                <div className="flex items-center justify-end mt-4">       
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Post
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
