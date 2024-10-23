export default function CategoryList() {
  const products = [
    {
      img: 'https://cdn.easyfrontend.com/pictures/ecommerce/product25.jpg',
      title: 'Holiday Season',
    },
    {
      img: 'https://cdn.easyfrontend.com/pictures/ecommerce/product26.jpg',
      title: 'For Him',
    },
    {
      img: 'https://cdn.easyfrontend.com/pictures/ecommerce/product35.jpg',
      title: 'For Kids',
    },
    {
      img: 'https://cdn.easyfrontend.com/pictures/ecommerce/product28.jpg',
      title: 'Indoors',
    },
    {
      img: 'https://cdn.easyfrontend.com/pictures/ecommerce/product29.jpg',
      title: 'For Her',
    },
    {
      img: 'https://cdn.easyfrontend.com/pictures/ecommerce/product30.jpg',
      title: 'Best Discounts',
    },
  ]
  return (
    <a href='#!'>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-44 h-44 flex justify-center items-center'>
          <img src={product.img} className='rounded-full max-w-full max-h-full w-auto' alt='...' />
        </div>
        <div className='p-4 md:p-6'>
          <h2 className='text-lg font-bold leading-none my-2'>{product.title}</h2>
        </div>
      </div>
    </a>
  )
}
