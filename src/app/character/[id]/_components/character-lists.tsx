import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface CharacterList {
  readonly title: string;
  readonly values: readonly string[];
}

interface Props {
  readonly lists: readonly CharacterList[];
}

export function CharacterLists({ lists }: Props) {
  if (lists.length === 0) {
    return undefined;
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      {lists.map((list) => (
        <Card key={list.title}>
          <CardHeader>
            <CardTitle>{list.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='flex flex-col gap-1.5 text-sm'>
              {list.values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
