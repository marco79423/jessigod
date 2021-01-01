import uuid


def generate_id():
    return str(uuid.uuid4())


def to_camel(string: str) -> str:
    return ''.join(word.capitalize() if idx != 0 else word for idx, word in enumerate(string.split('_')))
