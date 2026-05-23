import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

//Chave do meu banco
const SUPABASE_URL = 'https://binekdahtakvifxfewfi.supabase.co'
//Chave pública do supabase do meu banco
const SUPABASE_ANON_KEY = 'sb_publishable_FDtvOfU63-GtEH6-bxrzhA_CkUQcVwI'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

//Cadastro
export async function signup(nome, telefone, dataNascimento, email, senha) {
  try {
    const telefoneLimpo = telefone.replace(/\D/g, '')

    //Criar usuário no auth

    const { data: authData, error: authError} =
      await supabase.auth.signUp({
        email: email,
        password: senha
      })

      if (authError) throw authError

      const user = authData.user

      //Salva dados complementares
    const { data, error } = await supabase
      .from('usuario')
      .insert([ //insere obvio
        {
          auth_user_id: user.id,
          nome_completo: nome,
          telefone: telefoneLimpo,
          data_nascimento: dataNascimento,
          
        }
      ])
      .select()

    if (error) throw error

    return { success: true, user: data[0] }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

//Login

export async function entrar(email,senha) {
  try {
   
    const {data: authData, error: authError} = await supabase.auth.signInWithPassword({
      email: email,
      password: senha
    })

      if(authError) throw authError

      const { data: sessionData } =
       await supabase.auth.getSession()

      const user = sessionData.session.user

      //busca os dados do usuario
      const { data, error} = await supabase
      .from('usuario')
      .select('*')
      .eq('auth_user_id', user.id)
      .single()
      
      if (error) throw error

       //salva usuario
      localStorage.setItem("usuario", JSON.stringify(data))

      //busca preferencias
      const res = await buscarPreferencias(data.usuario_id)

      if (res.preferencias) {
      localStorage.setItem("preferencias", JSON.stringify(res.preferencias))
      }

    return {success:true, user:data}
      
  } catch(error) {
    return {success:false, error:error.message}
  }
  
}

//Salvar preferencias 
export async function salvarPreferencias(usuarioId, preferencias) {
  try {
   

    const {data, error} = await  supabase
      .from('usuario_acessibilidade_settings')
      .upsert([ //insere ou atualiza
        {usuario_id: usuarioId,
          tamanho_fonte: preferencias.tamanhoFonte,
          modo_escuro: preferencias.modoEscuro,
          audio_descricao: preferencias.audioDescricao,
        }
      ], {onConflict: 'usuario_id'}) //se ja tiver um registro com  mesmo id ele só atualiza, precisa ser UNIQUE no bd (usuario_id) para funcionar

      //colocar isso no SQL do banco final: SELECT usuario_id, COUNT(*) / FROM usuario_acessibilidade_settings / GROUP BY usuario_id / HAVING COUNT(*) > 1;
      if(error) throw error 
        
      return {success:true}
      } catch(error) {
        return {success:false, error:error.message}
      }
  
}

//Buscar preferencias
export async function buscarPreferencias(usuarioId) {
  try {

    const {data, error} = await  supabase
      .from('usuario_acessibilidade_settings')
      .select('*')
      .eq('usuario_id', usuarioId) 
      .single() //garante que só vem 1

      if(error && error.code !== 'PGRST116') throw error 
        //esse bando de letra e numero significa "não encontrou nada" é padrão

      return {success:true, preferencias:data}     
      } catch(error) {
        return {success:false, error:error.message}
      }
  
}

//Aplicar em todas as paginas as Preferências
export function aplicarPreferencias(preferencias) {
  if (preferencias.modo_escuro || preferencias.modoEscuro) { //aceita tanto do bd como do js
    document.body.classList.add("dark")
  } else {
    document.body.classList.remove("dark")
  }

  const tamanho = preferencias.tamanho_fonte || preferencias.tamanhoFonte
  document.body.style.fontSize = tamanho + "px"

  if (preferencias.audio_descricao || preferencias.audioDescricao) {
    console.log("Áudio descrição ativada")
  }
}