"""Local story templates for Emma's first reading app prototype."""

from dataclasses import dataclass


@dataclass(frozen=True)
class Story:
    title: str
    value: str
    paragraphs: list[str]


STORIES: dict[str, Story] = {
    "kite": Story(
        title="La cometa de Emma",
        value="Perseverancia",
        paragraphs=[
            "Emma tiene una cometa roja. Hoy quiere verla volar.",
            "Papá Jaime sujeta el hilo. Mamá Rocío y Mía miran desde la hierba.",
            "Emma corre. La cometa sube un poco… y cae.",
            "—Podemos probar otra vez —dice mamá.",
            "Emma descubre que el hilo está enredado. Con papá, lo desenreda.",
            "Esta vez corre con calma. La cometa sube y baila en el cielo.",
            "—¡Lo hemos logrado! —dice Emma. Su familia la abraza.",
        ],
    ),
    "friends": Story(
        title="Un lugar para jugar",
        value="Amistad",
        paragraphs=[
            "Emma lleva una pelota al claro del bosque. Allí encuentra a una tortuga que mira desde un lado.",
            "—¿Quieres jugar conmigo? —pregunta Emma.",
            "La tortuga sonríe. Juntas hacen rodar la pelota por el camino.",
            "La pelota se atasca bajo una rama. Emma tira, pero no puede sola.",
            "La tortuga empuja desde el otro lado. ¡La pelota sale!",
            "Papá Jaime, Mamá Rocío y Mía se unen al juego.",
            "Emma aprende que jugar juntas es más divertido. La tortuga ya tiene una amiga.",
        ],
    ),
    "walk": Story(
        title="El camino de Emma",
        value="Autonomía",
        paragraphs=[
            "Emma va a dar un paseo corto con su familia. Mamá le pregunta si quiere llevar su pequeña mochila.",
            "—Sí, yo puedo —responde Emma.",
            "Emma guarda su botella y una manzana. Después se pone la mochila.",
            "En el camino ve dos senderos. Se detiene y mira las señales.",
            "—Creo que es por aquí —dice Emma. Papá comprueba el mapa con ella.",
            "Emma encuentra el banco del parque. Allí descansan y comparten la manzana.",
            "—Elegiste bien y pediste ayuda cuando la necesitabas —dice mamá.",
            "Emma sonríe. Cada día puede hacer un poco más por sí misma.",
        ],
    ),
}


def build_story(story_id: str, child_name: str = "Emma") -> dict[str, object]:
    """Return a story with the reader's name substituted."""
    if story_id not in STORIES:
        raise ValueError("Cuento desconocido")
    story = STORIES[story_id]
    safe_name = child_name.strip()[:24] or "Emma"
    return {
        "id": story_id,
        "title": story.title.replace("Emma", safe_name),
        "value": story.value,
        "paragraphs": [paragraph.replace("Emma", safe_name) for paragraph in story.paragraphs],
    }
