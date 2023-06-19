import { RenderResult, fireEvent } from '../../../test-utils';

const defaultfile = new File(['mocked content'], 'Mocked file.txt', { type: 'text/plain' });

export function createMockedFile(name: string, type: string, size: number = 1024): File {
  const range = (count: number) => {
    let output = '';
    for (let i = 0; i < count; i++) {
      output += 'a';
    }
    return output;
  };

  return new File([range(size)], name, { type });
}

export function createMockedBlob(type: string, size: number = 1024): Blob {
  const range = (count: number) => {
    let output = '';
    for (let i = 0; i < count; i++) {
      output += 'a';
    }
    return output;
  };

  return new Blob([range(size)], { type });
}

export async function uploadMockedFile(ui: RenderResult, id: string, file: File = defaultfile) {
  const fileInput = ui.queryByTestId(`file-input-${id}`);
  expect(fileInput).toBeInTheDocument();
  const input = fileInput?.querySelector('input');
  fireEvent.change(input!, { target: { files: [file] } });
}
