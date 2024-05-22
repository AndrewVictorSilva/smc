import useAuth from "../contexts/authContext";
import { GridItem } from "./GridItem";

const gridItems = [
  {
    title: "FMI",
    customer: "FMI",
    src: "https://app.powerbi.com/view?r=eyJrIjoiODY3MmNkM2UtNjNmNC00OWZkLWEwNmYtOTUyMWVjZDJjYTc3IiwidCI6IjMzNDQwZmM2LWI3YzctNDEyYy1iYjczLTBlNzBiMDE5OGQ1YSIsImMiOjh9",
    allowFullScreen: true,
    width: "750",
    height: "500"
  },
  {
    title: "Grupo Marista - Dashboard de Problemas e Ações",
    customer: "Marista",
    src: "https://app.powerbi.com/view?r=eyJrIjoiNjViMjQxYWUtNWExMS00ZTg1LWJiOGYtZDAwMjYxMzc3MGRjIiwidCI6IjMzNDQwZmM2LWI3YzctNDEyYy1iYjczLTBlNzBiMDE5OGQ1YSIsImMiOjh9",
    allowFullScreen: true,
    width: "750",
    height: "500"
  },
  {
    title: "Toyota_Backlog",
    customer: "Toyota",
    src: "https://app.powerbi.com/view?r=eyJrIjoiNTE0NzEwZTEtMTUzMy00NzI5LThjYWItMjdhODI5NjA5NGU1IiwidCI6IjMzNDQwZmM2LWI3YzctNDEyYy1iYjczLTBlNzBiMDE5OGQ1YSIsImMiOjh9",
    allowFullScreen: true,
    width: "750",
    height: "500"
  }
];

export function Grid() {
  const { currentUser } = useAuth();

  const emailDomain = currentUser.email.split('@')[1];
  const firstWordAfterAt = emailDomain.split('.')[0];

  // Determine if we should render all grid items
  const renderAllItems = firstWordAfterAt.toLowerCase() === 'atos';

  // Filter grid items based on the first word after the '@' if not 'atos'
  const matchingGridItems = renderAllItems ? gridItems : gridItems.filter(item => item.customer.toLowerCase() === firstWordAfterAt.toLowerCase());

  return (
    <div className="w-full h-full flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12  ">
        {matchingGridItems.length > 0 ? (
          matchingGridItems.map(item => (
            <GridItem
              key={item.title}
              title={item.title}
              customer={item.customer}
              src={item.src}
              allowFullScreen={item.allowFullScreen}
              width={item.width}
              height={item.height}
            />
          ))
        ) : (
          <p>Email domain does not match any customer.</p>
        )}
      </div>
    </div>
  );
}
