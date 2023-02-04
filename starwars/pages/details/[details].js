import fetch from 'isomorphic-unfetch';

export const getStaticPaths = async () => {
  const res = await fetch('https://swapi.dev/api/films');
  const data = await res.json();

  const paths = data.results.map(film => {
    return {
      params: { details: film.episode_id.toString() },
    };
  });
  return {
    paths,
    fallback: false,

   
  };
console.log(paths)

};



export const getStaticProps = async (context) => {
  const id = context.params.details;
  const res = await fetch(`https://swapi.dev/api/films/${id}`);
  const data = await res.json();

  return {
    props: { film: data },
  };
};

const Details = ({ film }) => {
  return (
    <div className='card'>
      <h3>Episode {film.episode_id}</h3>
      <hr></hr>
      <h2>{film.title}</h2>
      <p>{film.opening_crawl}</p>
      <p><strong>Director:</strong> {film.director}</p>
      <p><strong>Producer</strong>(<strong>s</strong>)<strong>: </strong>{film.producer}</p>
      <p><strong>Release Date:</strong> {film.release_date}</p>

      <style jsx>{`
        
       h3, h2{
        text-align: center;
       }

         .card{
           border-left:20px solid rgb(191, 38, 38);
           padding: 20px 30px 20px 40px;
           border-radius: 5px 30px 30px 5px;
           width:40%;
           margin-top:35px; 
           margin-left:10%;
           background:white;
           display:block;
           
         }

       
  `}</style>

      
    </div>
  );
};

export default Details;
