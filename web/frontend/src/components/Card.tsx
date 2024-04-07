import { ReactNode } from 'react';

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md h-96 w-96 m-4 flex justify-center">
      {children}
    </div>
  )
}

export default Card
