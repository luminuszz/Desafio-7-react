/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';
import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [hasLoad, setHasLoad] = useState(false);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();
    uploadedFiles.map(upload => {
      data.set('file', upload.file, 'file');
    });
    setHasLoad(true);
    try {
      await api.post('/transactions/import', data);
      toast.success('Csv importado com sucesso !!');
      history.push('/');
    } catch (err) {
      setHasLoad(false);
      toast.error(err.message);
    }
  }

  function submitFile(files: File[]): void {
    const newfiles: File[] = [];
    files.map(file => {
      const newFile: FileProps = {
        file,
        name: file.name,
        readableSize: filesize(file.size),
      };
      setUploadedFiles([...uploadedFiles, newFile]);
    });
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              {hasLoad ? <ReactLoading /> : 'Enviar'}
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
