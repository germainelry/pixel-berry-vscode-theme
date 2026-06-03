// 11-rust.rs — lifetimes, traits, macros, generics, Option/Result, match.
use std::collections::HashMap;
use std::fmt::{self, Display};

const MAX_RETRIES: usize = 3;
static GREETING: &'static str = "hello, world";

#[derive(Debug, Clone, PartialEq)]
pub enum Status {
    Active,
    Idle,
    Done(String),
}

impl Display for Status {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Status::Active   => write!(f, "active"),
            Status::Idle     => write!(f, "idle"),
            Status::Done(msg) => write!(f, "done: {}", msg),
        }
    }
}

/// A borrow-scoped, in-memory key/value cache keyed by `u32`.
pub struct Repo<'a, T: Clone> {
    name: &'a str,
    cache: HashMap<u32, T>,
}

impl<'a, T: Clone + Display> Repo<'a, T> {
    pub fn new(name: &'a str) -> Self {
        Self { name, cache: HashMap::new() }
    }

    pub fn insert(&mut self, id: u32, value: T) -> Option<T> {
        self.cache.insert(id, value)
    }

    pub fn get(&self, id: u32) -> Option<&T> {
        self.cache.get(&id)
    }
}

pub trait Loadable {
    type Output;
    fn load(&self) -> Result<Self::Output, String>;
}

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &b) in bytes.iter().enumerate() {
        if b == b' ' {
            return &s[..i];
        }
    }
    s
}

#[allow(clippy::needless_return)]
fn process(values: &[i32]) -> Vec<i32> {
    /* keep positives, double them, cap at ten results */
    values
        .iter()
        .filter(|&&x| x > 0)
        .map(|&x| x * 2)
        .take(10)
        .collect()
}

fn main() {
    let mut repo: Repo<Status> = Repo::new("statuses");
    repo.insert(1, Status::Active);
    repo.insert(2, Status::Done("complete".to_string()));

    for id in 1..=MAX_RETRIES as u32 {
        match repo.get(id) {
            Some(s) => println!("{}: {}", id, s),
            None    => eprintln!("missing id {}", id),
        }
    }

    let xs = vec![1, -2, 3, -4, 5];
    let doubled = process(&xs);
    println!("{} → {:?}", GREETING, doubled);
    let _word = first_word("hello world");
}
