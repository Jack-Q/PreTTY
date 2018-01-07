import * as React from 'react';
import { ISftpFile } from '../util/sftp-context';

import * as styles from './file-entry.scss';

interface IProps {
  file: ISftpFile;
}

export class FileEntry extends React.Component<IProps> {
  public render() {
    const file = this.props.file;
    return (
      <div className={styles.fileEntry}>
        <div>

        </div>
        {file.name}
      </div>
    );
  }
}
