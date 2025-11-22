//como estamos pegando o id na linha 42 , se "result" é igual a "reponse.json" , e "response" é os dados que mandamos(post) para o banco. E o id é criado no banco, como que estamos pegando esse id , se não fizemos um get no banco? 
import { useRef } from 'react'
import './PaginaCadastro.css'
import Rodape from '../components/Rodape'
import LogoCabecalho from '../components/LogoCabecalho'
import { Camera } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

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

const diaAtual = new Date().getDate();
const mesAtual = new Date().getMonth() + 1; // getMonth() retorna 0-11, então adicionamos 1
const anoAtual = new Date().getFullYear();

const schema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    sobrenome: yup.string().required('Sobrenome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    imagem: yup.string().required('Foto é obrigatória'),
    diaNascimento: yup.number().required('Dia é obrigatório'),
    mesNascimento: yup.number().required('Mês é obrigatório'),
    anoNascimento: yup.number().required('Ano é obrigatório')
        .max(2021, 'Data incorreta'),
    genero: yup.string().oneOf(['masculino', 'feminino', 'personalizado', ''], 'Gênero inválido').required('Gênero é obrigatório'),
});

const getDays = () => Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const getMonths = () => [
    { value: '1', label: 'Jan' }, { value: '2', label: 'Fev' },
    { value: '3', label: 'Mar' }, { value: '4', label: 'Abr' },
    { value: '5', label: 'Mai' }, { value: '6', label: 'Jun' },
    { value: '7', label: 'Jul' }, { value: '8', label: 'Ago' },
    { value: '9', label: 'Set' }, { value: '10', label: 'Out' },
    { value: '11', label: 'Nov' }, { value: '12', label: 'Dez' },
];
const getYears = () => Array.from({ length: 121 }, (_, i) => (new Date().getFullYear() - i).toString());

const PaginaCadastro = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema), // Integração do Yup com o RHF
        mode: 'onBlur',
        defaultValues: {
            genero: '',
            diaNascimento: diaAtual,
            mesNascimento: mesAtual,
            anoNascimento: anoAtual,
        },
    });

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const inputFileRef = useRef<HTMLInputElement | undefined>(undefined)
    const imagemCarregada = watch('imagem')

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const postData = {
            nome: data.nome,
            sobrenome: data.sobrenome,
            email: data.email,
            senha: data.senha,
            imagem: data.imagem,
            genero: data.genero,
            data_nascimento: `${data.diaNascimento}/${data.mesNascimento}/${data.anoNascimento}`
        };
        console.log(postData)

        try {
            // Envia os dados como multipart/form-data
            const response = await axios.post('http://localhost:3000/usuario', postData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Resposta do servidor:', response.data);
            alert('Usuário cadastrado com sucesso!');
            window.location.href = "/"
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Erro ao cadastrar usuário.');
        }
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const base64String = await convertToBase64(file);
            setValue('imagem', base64String, { shouldValidate: true }); // Define o valor no hook form
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
                                <div className='inputEError'>
                                    <input
                                        className={`input-field ${errors.nome ? 'inputCadastroNomeErro' : 'inputCadastroNome'}`}
                                        type="text"
                                        placeholder='Nome'
                                        {...register('nome')} />
                                    {errors.nome && <span className='mensagemError'>{errors.nome.message}</span>}
                                </div>
                                <div>
                                    <div className='inputEError'>
                                        <input
                                            className={`input-field ${errors.sobrenome ? 'inputCadastroNomeErro' : 'inputCadastroNome'}`}
                                            type="text"
                                            placeholder='Sobrenome'
                                            {...register('sobrenome')} />
                                        {errors.sobrenome && <span className='mensagemError'>{errors.sobrenome.message}</span>}
                                    </div>
                                </div>
                                <div id='iconeCamera' title='Foto de Perfil' onClick={() => inputFileRef.current?.click()}>
                                    <input type="file" hidden ref={inputFileRef} accept='image/*' onChange={handleImageChange} />
                                    {imagemCarregada ? <img id="imagemCadastro" src={imagemCarregada} /> : <Camera/>}
                                    <div>
                                        {errors.imagem && <span style={{ position: "absolute", marginTop: "5px", fontSize: 10, color: "red", marginLeft: -24 }}>{errors.imagem.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div id='containerPrincipalData'>
                                <div id='tituloData'>Data de nascimento
                                    <a id="birthday-help" href="#" title="Clique para obter mais informações" role="button"><i></i></a>
                                </div>
                                <div>
                                    <span id="containerData" data-type="selectors">
                                        <select className={`input-field ${errors.anoNascimento ? 'seletoresErro' : 'seletores'}`} title='Dia' {...register('diaNascimento')}>
                                            {getDays().map((day) => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                        <select className={`input-field ${errors.anoNascimento ? 'seletoresErro' : 'seletores'}`} title='Mês'{...register('mesNascimento')}>

                                            {getMonths().map((month) => (
                                                <option key={month.value} value={month.value}>{month.label}</option>
                                            ))}
                                        </select>
                                        <select className={`input-field ${errors.anoNascimento ? 'seletoresErro' : 'seletores'}`} title='Ano' {...register('anoNascimento')}>

                                            {getYears().map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </span>
                                </div>
                                {(errors.diaNascimento || errors.mesNascimento || errors.anoNascimento) && (
                                    <span style={{ color: "red", position: "absolute", marginTop: "-2px", fontSize: 10 }}>{errors.anoNascimento?.message} </span>
                                )}
                                <div id="containerPrincipalGenero">
                                    <div id="tituloGenero">Gênero
                                        <a title="Clique para obter mais informações" href="#" role="button">
                                            <i > </i>
                                        </a>
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
                                    {errors.genero && <span style={{ color: "red", position: "absolute", marginTop: "-2px", fontSize: 10 }}>{errors.genero.message}</span>}
                                </div>
                                <div id='containerEmailESenha'>
                                    <div className='inputEError'>
                                        <input className={`input-field ${errors.email ? 'inputEmailESenhaErro' : 'inputEmailESenha'}`} placeholder='Celular ou email' type="email" {...register('email')} />
                                        {errors.email && <span style={{ fontSize: 10, color: 'red', position: 'absolute', marginTop: 41 }}>{errors.email.message}</span>}
                                    </div>
                                    <div className='inputEError'>
                                        <input className={`input-field ${errors.senha ? 'inputEmailESenhaErro' : 'inputEmailESenha'}`} type="text" placeholder='Nova senha' {...register('senha')} />
                                        {errors.senha && <span style={{ fontSize: 10, color: 'red', position: 'absolute', marginTop: 40 }}>{errors.senha.message}</span>}
                                    </div>
                                </div>
                                <p className='textoInformativo'>As pessoas que usam nosso serviço podem ter carregado suas informações de contato no Facebook.
                                    <a className="linkDoTexto" href="/help/637205020878504" role="link" target="_blank" >Saiba mais</a>.
                                </p>
                                <p className='textoInformativo'>Ao clicar em Cadastre-se, você concorda com nossos
                                    <a className="linkDoTexto" href="/legal/terms/update" target="_blank">Termos</a>, <a className="linkDoTexto" href="/about/privacy/update" target="_blank">Política de Privacidade</a> e <a className="linkDoTexto" href="/policies/cookies/" target="_blank">Política de Cookies</a>. Você poderá receber notificações por SMS e cancelar isso quando quiser.</p>
                                <div id='containerBotaoELink'>

                                    <button id='botaoCadastrar' type="submit">
                                        Cadastrar
                                    </button>
                                    <a id='linkConta' href="/" aria-label="Já tem uma conta?" >Já tem uma conta?</a>
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