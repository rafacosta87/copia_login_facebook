import { useEffect, useRef } from 'react'
import { useNavigate , Link} from 'react-router-dom';
import './PaginaCadastro.css'
import Rodape from '../components/Rodape'
import LogoCabecalho from '../components/LogoCabecalho'
import { Camera} from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import axios from 'axios';



interface FormValues {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    imagem: string;
    diaNascimento: number;
    mesNascimento: number;
    anoNascimento: number;
    genero: 'masculino' | 'feminino' | 'personalizado' | '';
}

const schema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    sobrenome: yup.string().required('Sobrenome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    senha: yup.string().required('Senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    imagem: yup.string().required('Foto é obrigatória'),
    diaNascimento: yup.number().required('Dia é obrigatório'),
    mesNascimento: yup.number().required('Mês é obrigatório'),
    anoNascimento: yup.number().required('Ano é obrigatório')
        .max(new Date().getFullYear() - 5, 'Data incorreta'), // Mínimo 5 anos de idade
    genero: yup.string().oneOf(['masculino', 'feminino', 'personalizado', ''], 'Gênero inválido').required('Gênero é obrigatório'),
});

const getDays = () => Array.from({ length: 31 }, (_, i) => (i + 1).toString())
const getMonths = () => [
    { value: '1', label: 'Jan' }, { value: '2', label: 'Fev' },
    { value: '3', label: 'Mar' }, { value: '4', label: 'Abr' },
    { value: '5', label: 'Mai' }, { value: '6', label: 'Jun' },
    { value: '7', label: 'Jul' }, { value: '8', label: 'Ago' },
    { value: '9', label: 'Set' }, { value: '10', label: 'Out' },
    { value: '11', label: 'Nov' }, { value: '12', label: 'Dez' },
]
const getYears = () => Array.from({ length: 121 }, (_, i) => (new Date().getFullYear() - i).toString())

const PaginaCadastro = () => {
    useEffect(() => {
        document.title = "Cadastrar-se no Facebook";
    }, []);

    const navigate = useNavigate();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<FormValues>({
        resolver: yupResolver(schema), // Integração do Yup com o RHF
        mode: 'onBlur',
        defaultValues: {
            genero: '',
            diaNascimento: new Date().getDate(),
            mesNascimento: new Date().getMonth() + 1,
            anoNascimento: new Date().getFullYear(),
        },
    })

    const imagemCarregada = watch('imagem')

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        // Ativa o delay de 2 segundos
        await delay(1500);
        // Formata a data para dd/mm/aaaa conforme esperado pelo backend
        const postData = {
            nome: data.nome,
            sobrenome: data.sobrenome,
            email: data.email,
            senha: data.senha,
            imagem: data.imagem,
            genero: data.genero,
            data_nascimento: `${data.diaNascimento}/${data.mesNascimento}/${data.anoNascimento}`
        };
        try {
            const response = await fetch('http://localhost:3000/usuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });
            if (!response.ok) {
                const errorData = await response.json();

                // Mapeamento do primeiro erro retornado pela API
                if (errorData.errors && errorData.errors.length > 0) {
                    const erroAPI = errorData.errors[0];
                    // Se o erro for na data, mapeamos para o campo de ano no front
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const fieldMapping: any = erroAPI.path === 'data_nascimento' ? 'anoNascimento' : erroAPI.path;

                    setError(fieldMapping, {
                        type: 'manual',
                        message: erroAPI.message,
                    });
                }
                return;
            }
            alert('Cadastro realizado com sucesso! Faça o login para continuar.');
            navigate('/');
        } catch (error) {
            alert('Erro de conexão com o servidor. Tente novamente mais tarde.');
            console.error(error)
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setValue('imagem', reader.result as string, { shouldValidate: true });
            };
        }
    };

    return (
        <div>
            <div id="containerPrincipalCadastro">
                <LogoCabecalho />
                <div id="containerCadastro">
                    <div id="cabecalhoCadastro">
                        <div id='tituloCadastro'>Criar uma nova conta</div>
                        <div id='subTituloCadastro'>É rápido e fácil.</div>
                        <div id='containerLinhaDivisoria'>
                            <hr id='linhaDivisoria' />
                        </div>
                        <form id="formulario" onSubmit={handleSubmit(onSubmit)}>
                            <div id='cadastroNome'>
                                <div className='inputEErro'>
                                    <input
                                        className={`inputCadastroNome ${errors.nome ? 'bordaErroCadastro' : ''}`}
                                        type="text"
                                        placeholder='Nome'
                                        {...register('nome')} />
                                    {errors.nome && <span className='mensagemError'>{errors.nome.message}</span>}
                                </div>
                                <div>
                                    <div className='inputEErro'>
                                        <input
                                            className={`inputCadastroNome ${errors.nome ? 'bordaErroCadastro' : ''}`}
                                            type="text"
                                            placeholder='Sobrenome'
                                            {...register('sobrenome')} />
                                        {errors.sobrenome && <span className='mensagemError'>{errors.sobrenome.message}</span>}
                                    </div>
                                </div>
                                <div id='iconeCamera' title='Foto de Perfil' onClick={() => inputFileRef.current?.click()}>
                                    <input type="file" hidden ref={inputFileRef} accept='image/*' onChange={handleImageChange} />
                                    {imagemCarregada ? <img id="imagemCadastro" src={imagemCarregada} /> : <Camera />}
                                    <div className='erroImagem'>
                                        {errors.imagem && <span >{errors.imagem.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div id='containerPrincipalData'>
                                <div id='tituloData'>Data de nascimento
                                </div>
                                <div className='dataEErro'>
                                    <span id="containerData" data-type="selectors">
                                        <select className={`seletores ${errors.anoNascimento ? 'bordaErroCadastro' : ''}`} title='Dia' {...register('diaNascimento')}>
                                            {getDays().map((day) => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                        <select className={`seletores ${errors.anoNascimento ? 'bordaErroCadastro' : ''}`} title='Mês'{...register('mesNascimento')}>

                                            {getMonths().map((month) => (
                                                <option key={month.value} value={month.value}>{month.label}</option>
                                            ))}
                                        </select>
                                        <select className={`seletores ${errors.anoNascimento ? 'bordaErroCadastro' : ''}`} title='Ano' {...register('anoNascimento')}>

                                            {getYears().map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </span>
                                    {(errors.diaNascimento || errors.mesNascimento || errors.anoNascimento) && (
                                        <span className='erroPosicionado'>{errors.anoNascimento?.message} </span>
                                    )}
                                </div>
                                <div id="containerPrincipalGenero">
                                    <div id="tituloGenero">Gênero
                                    </div>
                                    <div id="containerGenero" data-type="radio" data-name="gender_wrapper" aria-describedby="gender-error-message" >
                                        <span className='opcoesGenero' >
                                            <label className='genero'>Feminino
                                                <input className="radio" type="radio" value="feminino" {...register('genero')} />
                                            </label>
                                        </span>
                                        <span className='opcoesGenero' >
                                            <label className='genero'>Masculino
                                                <input className="radio" type="radio" value="masculino" {...register('genero')} />
                                            </label>
                                        </span>
                                        <span className='opcoesGenero' >
                                            <label className='genero'>Personalizado
                                                <input className="radio" type="radio" value="personalizado" {...register('genero')} />
                                            </label>
                                        </span>
                                    </div>
                                    {errors.genero && <span className='erroPosicionado'>{errors.genero.message}</span>}
                                </div>
                                <div id='containerEmailESenha'>
                                    <div className='inputEErro'>
                                        <input className={`inputEmailESenha ${errors.email ? 'bordaErroCadastro' : ''}`} placeholder='Celular ou email' type="email" {...register('email')} />
                                        {errors.email && <span className='mensagemError'>{errors.email.message}</span>}
                                    </div>
                                    <div className='inputEErro'>
                                        <input className={`inputEmailESenha ${errors.senha ? 'bordaErroCadastro' : ''}`} type="text" placeholder='Nova senha' {...register('senha')} />
                                        {errors.senha && <span className='mensagemError'>{errors.senha.message}</span>}
                                    </div>
                                </div>
                                <p className='textoInformativo'>As pessoas que usam nosso serviço podem ter carregado suas informações de contato no Facebook.
                                    <a className="linkDoTexto" href="https://www.facebook.com/help/637205020878504" role="link" target="_blank" >Saiba mais</a>.
                                </p>
                                <p className='textoInformativo'>Ao clicar em Cadastre-se, você concorda com nossos
                                    <a className="linkDoTexto" href="https://www.facebook.com/legal/terms/update" target="_blank">Termos</a>, <a className="linkDoTexto" href="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0" target="_blank">Política de Privacidade</a> e <a className="linkDoTexto" href="https://www.facebook.com/privacy/policies/cookies/?entry_point=cookie_policy_redirect&entry=0" target="_blank">Política de Cookies</a>. Você poderá receber notificações por SMS e cancelar isso quando quiser.</p>
                                <div id='containerBotaoELink'>

                                    <button id='botaoCadastrar' type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Carregando..." : "Cadastre-se "}
                                    </button>
                                    <Link id='linkConta' to="/" aria-label="Já tem uma conta?" >Já tem uma conta?</Link>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <Rodape />
        </div>
    )
}
export default PaginaCadastro