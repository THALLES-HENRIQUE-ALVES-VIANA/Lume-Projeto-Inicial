import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ROWS_PER_PAGE_OPTIONS } from '../../constants/app-config';
import { usePaginationParams } from '../../hooks/use-pagination-params';
import { buildLicaoPayload, normalizeLicao, normalizeStringList } from '../../utils/record-utils';
import LicoesService from '../../services/licoes-crud.service';
import './licoes.css'

const EMPTY_LESSON = {
  title: '',
  question: '',
  option1: '',
  option2: '',
  option3: '',
};

export default function ListarLicoes() {
  const toast = useRef(null);
  const [licoes, setLicoes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [deleteLicoesDialog, setDeleteLicoesDialog] = useState(false);
  const [licao, setLicao] = useState(EMPTY_LESSON);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { first, rows, updatePagination } = usePaginationParams();

  const loadLicoes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await LicoesService.getLicoes();
      setLicoes((response.data || []).map(normalizeLicao));
    } catch (err) {
      setLicoes([]);
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível carregar as lições',
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLicoes();
  }, [loadLicoes]);

  const resetLicaoForm = () => {
    setLicao(EMPTY_LESSON);
    setSubmitted(false);
  };

  const openNew = () => {
    resetLicaoForm();
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    resetLicaoForm();
  };

  const hideDeletevisible = () => {
    setDeleteLicoesDialog(false);
  };

  const saveLicao = async () => {
    setSubmitted(true);

    if (!licao.title.trim()) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Campos obrigatórios',
        detail: 'Informe o título da lição',
        life: 3000,
      });
      return;
    }

    setSaving(true);

    // Mescla o estado plano do formulário garantindo que os arrays internos de questions e options 
    // sejam atualizados com o que o usuário de fato digitou na tela.
    const licaoComDadosDoForm = {
      ...licao,
      questions: [licao.question],
      options: [licao.option1, licao.option2, licao.option3].filter(Boolean)
    };

    const payload = buildLicaoPayload(licaoComDadosDoForm);

    try {
      const response = licao.id
        ? await LicoesService.putLicao(licao.id, payload)
        : await LicoesService.postLicao(payload);

      // Garante que se a API não retornar um ID para novos registros, geramos um fallback temporário
      const dadosRetornados = response.data || {};
      if (!dadosRetornados.id && !licao.id) {
        dadosRetornados.id = Date.now().toString(); 
      }

      const savedLicao = normalizeLicao(dadosRetornados);

      setLicoes((currentLicoes) => {
        if (licao.id) {
          return currentLicoes.map((item) =>
            item.id === savedLicao.id ? savedLicao : item
          );
        }
        return [...currentLicoes, savedLicao];
      });

      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: licao.id ? 'Lição atualizada.' : 'Lição cadastrada.',
        life: 3000,
      });

      setVisible(false);
      resetLicaoForm();
    } catch (err) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível salvar a lição',
        life: 3000,
      });
    } finally {
      setSaving(false);
    }
  };

  const editLicao = (selectedLicao) => {
    const normalizedLicao = normalizeLicao(selectedLicao);

    setLicao({
      id: normalizedLicao.id,
      title: normalizedLicao.title || '',
      question: normalizedLicao.questions?.[0] || '',
      option1: normalizedLicao.options?.[0] || '',
      option2: normalizedLicao.options?.[1] || '',
      option3: normalizedLicao.options?.[2] || '',
    });
    setSubmitted(false);
    setVisible(true);
  };

  const confirmDeleteLicao = (selectedLicao) => {
    setLicao(normalizeLicao(selectedLicao));
    setDeleteLicoesDialog(true);
  };

  const deleteLicao = async () => {
    if (!licao.id) return;

    setDeleting(true);

    try {
      await LicoesService.deleteLicaoById(licao.id);
      setLicoes((currentLicoes) => currentLicoes.filter((item) => item.id !== licao.id));
      setDeleteLicoesDialog(false);
      resetLicaoForm();
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Lição deletada',
        life: 3000,
      });
    } catch (err) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível deletar a lição',
        life: 3000,
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleInputChange = (campo, value) => {
    setLicao((currentLicao) => ({
      ...currentLicao,
      [campo]: value,
    }));
  };

  const actionBodyTemplate = (rowData) => (
    <React.Fragment>
      <Button
        icon="pi pi-pencil"
        rounded
        outlined
        className="mr-2"
        severity="warning"
        onClick={() => editLicao(rowData)}
      />
      <Button
        icon="pi pi-trash"
        rounded
        outlined
        severity="danger"
        onClick={() => confirmDeleteLicao(rowData)}
      />
    </React.Fragment>
  );

  const formatList = (value) => {
    const items = normalizeStringList(value);

    if (!items.length) {
      return <span className="muted-value">-</span>;
    }

    return (
      <div className="table-cell-list">
        {items.map((item, index) => (
          <div key={`${item}-${index}`}>{item}</div>
        ))}
      </div>
    );
  };

  const header = (
    <div className="adicionar-botao">
      <Button className="btn-add" rounded onClick={openNew}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Adicionar lição
      </Button>
    </div>
  );

  const visibleFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} className="btn-red-not-bg" />
      <Button label="Confirmar" icon="pi pi-check" onClick={saveLicao} className="btn-orange" loading={saving} />
    </React.Fragment>
  );

  const deletevisibleFooter = (
    <React.Fragment>
      <Button label="Não" icon="pi pi-times" outlined className="btn-orange-not-bg" onClick={hideDeletevisible} />
      <Button label="Sim" icon="pi pi-check" severity="danger" onClick={deleteLicao} loading={deleting} />
    </React.Fragment>
  );

  const licaoTitleInvalid = submitted && !licao.title?.trim();

  return (
    <div className="data-page">
      <Toast ref={toast} />

      <div className="content-card">
        <DataTable
          value={licoes}
          header={header}
          dataKey="id"
          paginator
          first={first}
          rows={rows}
          loading={loading}
          onPage={(event) => updatePagination(event.page, event.rows)}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="{first} ao {last} de {totalRecords} lições"
          emptyMessage="Nenhuma lição encontrada."
          responsiveLayout="scroll"
          stripedRows
        >
          <Column field="id" header="Código" sortable style={{ minWidth: '8rem' }} />
          <Column field="title" header="Título" sortable style={{ minWidth: '16rem' }} />
          <Column header="Questões" body={(rowData) => formatList(rowData.questions)} style={{ minWidth: '12rem' }} />
          <Column header="Opções" body={(rowData) => formatList(rowData.options)} style={{ minWidth: '12rem' }} />
          <Column body={actionBodyTemplate} style={{ minWidth: '8rem' }} />
        </DataTable>
      </div>

      <Dialog
        visible={visible}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header={licao.id ? 'Editar lição' : 'Nova lição'}
        modal
        className="p-fluid"
        footer={visibleFooter}
        onHide={hideDialog}
      >
        <div className="dialog-grid">
          <div className="field">
            <label htmlFor="title" className="font-bold">Título</label>
            <InputText
              id="title"
              value={licao.title}
              onChange={(event) => handleInputChange('title', event.target.value)}
              autoFocus
              className={licaoTitleInvalid ? 'p-invalid' : ''}
            />
            {licaoTitleInvalid && <small className="p-error">Informe o título da lição.</small>}
          </div>

          <div className="field">
            <label htmlFor="question" className="font-bold">Questão</label>
            <InputText
              id="question"
              value={licao.question}
              onChange={(event) => handleInputChange('question', event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="option1" className="font-bold">Opção A</label>
            <InputText
              id="option1"
              value={licao.option1}
              onChange={(event) => handleInputChange('option1', event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="option2" className="font-bold">Opção B</label>
            <InputText
              id="option2"
              value={licao.option2}
              onChange={(event) => handleInputChange('option2', event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="option3" className="font-bold">Opção C</label>
            <InputText
              id="option3"
              value={licao.option3}
              onChange={(event) => handleInputChange('option3', event.target.value)}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteLicoesDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirmar exclusão"
        modal
        footer={deletevisibleFooter}
        onHide={hideDeletevisible}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>
            Tem certeza que deseja excluir a lição? <b>{licao.title || '-'}</b>?
          </span>
        </div>
      </Dialog>
    </div>
  );
} 