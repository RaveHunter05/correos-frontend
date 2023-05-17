import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
	<h2 className="text-blue"> This is the beggining of my POS </h2> 
    </div>
  )
}
