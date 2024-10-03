import Link from "next/link";
import { fetchMaterials, fetchUsers } from "../../lib/data";
import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import MaterialCard from "@/app/components/materials/MaterialCard";
import MaterialUploadButton from "@/app/components/materials/MaterialUploadButton";

export default async function Page() {
    const materials = await fetchMaterials();

    return (
        <Container p="md" mt="lg">
            <Group justify="space-between">
                <Title order={2}>Materialien</Title>
                <MaterialUploadButton />
            </Group>
            <Stack gap="md" mt="md">
                {materials.length === 0 && <Text>Noch nichts hier...</Text>}
                {materials.sort().map((material) => (
                    <MaterialCard key={material.id} material={material} />
                ))}
            </Stack>
        </Container>
    );
}
