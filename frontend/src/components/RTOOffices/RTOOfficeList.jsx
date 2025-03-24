import { rtoOffices } from '../../assets/data/offices.js'
import OfficeCard from './RTOOfficeCard.jsx'

const RTOOfficeList = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
      {rtoOffices.map(office => ( 
        <OfficeCard key = {office.id} office={office}/>
      ))}
    </div>
  )
}

export default RTOOfficeList;