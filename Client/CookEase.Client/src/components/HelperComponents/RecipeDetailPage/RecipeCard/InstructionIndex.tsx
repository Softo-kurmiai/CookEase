export function InstructionIndex({ index = 0 }) {
    return (
      <div
        style={{
          borderRadius: '50%',
          color: 'white',
          backgroundColor: '#9BCD6D',
          width: '50px',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {index}
      </div>
    );
  }
  
  export default InstructionIndex;
  