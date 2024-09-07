import { Container, Title } from "@mantine/core";

export default async function Page() {
    return (
        <Container p={"md"} mt="lg">
            <Title order={2}>Materials</Title>
            <div>
                Nothing here yet. Should we move all of our stuff here? Do we
                have a lot to migrate? I don't know
            </div>
        </Container>
    );
}
