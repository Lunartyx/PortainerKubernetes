import { ReactNode } from 'react';

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md h-96 w-1/3">
      {children}
    </div>
  )
}

export default Card
