import { deleteAsync } from 'del';

function reset() {
  const { app } = global;
  return deleteAsync(app.path.clean);
}

export default reset;
