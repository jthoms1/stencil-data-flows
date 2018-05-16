export const TodoLink = ({ active, children, onClick }) => (
  <button
     onClick={onClick}
     disabled={active}
     style={{
         marginLeft: '4px',
     }}
  >
    {children}
  </button>
);
