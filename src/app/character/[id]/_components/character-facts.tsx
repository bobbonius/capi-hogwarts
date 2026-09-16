import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface CharacterFact {
  readonly label: string;
  readonly value: string;
}

interface Props {
  readonly facts: readonly CharacterFact[];
}

export function CharacterFacts({ facts }: Props) {
  if (facts.length === 0) {
    return undefined;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {facts.map((fact) => (
            <div key={fact.label} className='flex flex-col gap-1'>
              <dt className='text-xs font-medium text-muted-foreground'>
                {fact.label}
              </dt>
              <dd className='text-sm'>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
